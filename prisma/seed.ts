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

  const user = await prisma.users.create({
    data: {
      name: 'Elkin Carriel',
      email: 'escarriel@sudamericano.edu.ec',
      password: hashedPassword,
      roleId: adminRole.roleId,
    },
  });

  console.log('Seed data created');

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
      userId: user.userId,
    },
  });

  const device2 = await prisma.devices.create({
    data: {
      name: 'Device 2',
      status: false,
      userId: user2.userId,
    },
  });

  const event1 = await prisma.events.create({
    data: {
      oxygen: 98.1,
      heartRate: 80.1,
      userId: user.userId,
    },
  });

  const event2 = await prisma.events.create({
    data: {
      oxygen: 90,
      heartRate: 81,
      userId: user2.userId,
    },
  });

  const variables = { device1, device2, event1, event2 };
  console.log(`Datos de seed ${variables}\n creados exitosamente`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
