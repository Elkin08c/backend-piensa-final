import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.roles.create({
    data: {
      name: 'admin',
    },
  });

  const userRole = await prisma.roles.create({
    data: {
      name: 'user',
    },
  });

  const password = 'elkin123';
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const adminUser = await prisma.users.create({
    data: {
      name: 'Elkin Carriel',
      email: 'escarriel@sudamericano.edu.ec',
      password: hashedPassword,
      roleId: adminRole.roleId,
    },
  });

  const user2 = await prisma.users.create({
    data: {
      name: 'John De',
      email: 'jhondoe@example.com',
      password: 'hashedPassword',
      roleId: userRole.roleId,
    },
  });

  const device1 = await prisma.devices.create({
    data: {
      name: 'Device 1',
      status: false,
      userId: adminUser.userId,
    },
  });

  const device2 = await prisma.devices.create({
    data: {
      name: 'Device 2',
      status: false,
      userId: user2.userId,
    },
  });

  const sleep1 = await prisma.sleep.create({
    data: {
      startSleep: new Date('2023-08-01T23:00:00.000Z'),
      endSleep: new Date('2023-08-02T07:00:00.000Z'),
      userId: adminUser.userId,
      healthData: [
        { bloodOxygen: 95, heartRate: 60 },
        { bloodOxygen: 96, heartRate: 58 },
        { bloodOxygen: 97, heartRate: 59 },
      ],
    },
  });
  
  const sleep2 = await prisma.sleep.create({
    data: {
      startSleep: new Date('2023-08-01T23:30:00.000Z'),
      endSleep: new Date('2023-08-02T06:45:00.000Z'),
      userId: user2.userId,
      healthData: [
        { bloodOxygen: 94, heartRate: 62 },
        { bloodOxygen: 93, heartRate: 64 },
        { bloodOxygen: 95, heartRate: 61 },
      ],
    },
  });

  console.log('Seed data created successfully', {
    adminUser,
    user2,
    device1,
    device2,
    sleep1,
    sleep2,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
