import fs from 'fs'
import { faker } from '@faker-js/faker'
import { createPassword, createUser } from 'tests/db-utils.ts'
import { prisma } from '~/utils/db.server.ts'
import { deleteAllData } from 'tests/setup/utils.ts'
import { getPasswordHash } from '~/utils/auth.server.ts'

async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')
	deleteAllData()
	console.timeEnd('🧹 Cleaned up the database...')

	console.time(`👑 Created admin role/permission...`)
	const adminRole = await prisma.role.create({
		data: {
			name: 'admin',
			permissions: {
				create: { name: 'admin' },
			},
		},
	})
	console.timeEnd(`👑 Created admin role/permission...`)

// removed section - generating additional faker users
	// const totalUsers = 20
	// console.time(`👤 Created ${totalUsers} users...`)
	// const users = await Promise.all(
	// 	Array.from({ length: totalUsers }, async (_, index) => {
	// 		const userData = createUser()
	// 		const user = await prisma.user.create({
	// 			data: {
	// 				...userData,
	// 				password: {
	// 					create: createPassword(userData.username),
	// 				},
	// 				image: {
	// 					create: {
	// 						contentType: 'image/jpeg',
	// 						file: {
	// 							create: {
	// 								blob: await fs.promises.readFile(
	// 									`./tests/fixtures/images/user/${index % 10}.jpg`,
	// 								),
	// 							},
	// 						},
	// 					},
	// 				},
	// 				notes: {
	// 					create: Array.from({
	// 						length: faker.number.int({ min: 0, max: 10 }),
	// 					}).map(() => ({
	// 						title: faker.lorem.sentence(),
	// 						content: faker.lorem.paragraphs(),
	// 					})),
	// 				},
	// 			},
	// 		})
	// 		return user
	// 	}),
	// )
	// console.timeEnd(`👤 Created ${totalUsers} users...`)
//

	console.time(
		`Created user "woch" with the password "wochlife" and admin role`,
	)
	await prisma.user.create({
		data: {
			email: 'filip@wochlife.com',
			username: 'woch',
			name: 'World Of Chaos',
			roles: { connect: { id: adminRole.id } },
			image: {
				create: {
					contentType: 'image/png',
					file: {
						create: {
							blob: await fs.promises.readFile(
								'./tests/fixtures/images/user/3.jpg',
							),
						},
					},
				},
			},
			password: {
				create: {
					hash: await getPasswordHash('wochlife'),
				},
			},
			notes: {
				create: [
					{
						title: 'Basic Koala Facts',
						content:
							'Koalas are found in the eucalyptus forests of eastern Australia. They have grey fur with a cream-coloured chest, and strong, clawed feet, perfect for living in the branches of trees!',
					},
					{
						title: 'Koalas like to cuddle',
						content:
							'Cuddly critters, koalas measure about 60cm to 85cm long, and weigh about 14kg.',
					},
					{
						title: 'Not bears',
						content:
							"Although you may have heard people call them koala 'bears', these awesome animals aren’t bears at all – they are in fact marsupials. A group of mammals, most marsupials have pouches where their newborns develop.",
					},
				],
			},
		},
	})
	console.timeEnd(
		`Created user "woch" with the password "wochlife" and admin role`,
	)


	console.time(
		`Created user "jenda" with the password "jendovoheslo" and admin role`,
	)
	await prisma.user.create({
		data: {
			email: 'jendovoemail@gmail.com',
			username: 'jenda',
			name: 'Jenda Pospisil',
			roles: { connect: { id: adminRole.id } },
			image: {
				create: {
					contentType: 'image/png',
					file: {
						create: {
							blob: await fs.promises.readFile(
								'./tests/fixtures/images/user/5.jpg',
							),
						},
					},
				},
			},
			password: {
				create: {
					hash: await getPasswordHash('jendovoheslo'),
				},
			},
			notes: {
				create: [
					{
						title: 'Basic Koala Facts For Jenda',
						content:
							'Koalas are found in the eucalyptus forests of eastern Australia. They have grey fur with a cream-coloured chest, and strong, clawed feet, perfect for living in the branches of trees!',
					},
					{
						title: 'Koalas like to cuddle For Jenda',
						content:
							'Cuddly critters, koalas measure about 60cm to 85cm long, and weigh about 14kg.',
					},
					{
						title: 'Not bears For Jenda',
						content:
							"Although you may have heard people call them koala 'bears', these awesome animals aren’t bears at all – they are in fact marsupials. A group of mammals, most marsupials have pouches where their newborns develop.",
					},
				],
			},
		},
	})
	console.timeEnd(
		`Created user "jenda" with the password "jendovoheslo" and admin role`,
	)


	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

/*
eslint
	@typescript-eslint/no-unused-vars: "off",
*/
