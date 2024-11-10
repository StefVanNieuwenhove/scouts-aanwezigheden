import { Group, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.member.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        group: Group.KAPOENEN,
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        group: Group.KAPOENEN,
      },
      {
        firstName: 'Bob',
        lastName: 'Doe',
        group: Group.KAPOENEN,
      },
      {
        firstName: 'Alice',
        lastName: 'Doe',
        group: Group.WOUTERS,
      },
      {
        firstName: 'Eve',
        lastName: 'Doe',
        group: Group.WOUTERS,
      },
      {
        firstName: 'Frank',
        lastName: 'Doe',
        group: Group.WOUTERS,
      },
      {
        firstName: 'George',
        lastName: 'Doe',
        group: Group.JONGGIVERS,
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        group: Group.JONGGIVERS,
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        group: Group.JONGGIVERS,
      },
      {
        firstName: 'Bob',
        lastName: 'Doe',
        group: Group.GIVERS,
      },
      {
        firstName: 'Alice',
        lastName: 'Doe',
        group: Group.GIVERS,
      },
      {
        firstName: 'Eve',
        lastName: 'Doe',
        group: Group.GIVERS,
      },
      {
        firstName: 'Frank',
        lastName: 'Doe',
        group: Group.JINS,
      },
      {
        firstName: 'George',
        lastName: 'Doe',
        group: Group.JINS,
      },
      {
        firstName: 'Joe',
        lastName: 'Doe',
        group: Group.JINS,
      },
      {
        firstName: 'Jack',
        lastName: 'Doe',
        group: Group.UNKNOWN,
      },
    ],
  });

  console.log(users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
