const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const server = require('../src/index');
const UserModel = require('../src/models/user.model');

const api = request(app);
const ROUTE = '/api/v1/users';

const testUser = {
	name: 'test',
	username: 'test1',
	password: 'P455',
	role: 'estudiante',
};
const duplicatedUser = {
	name: 'Duplicated user',
	username: 'test1',
	password: 'P455',
	role: 'estudiante',
};

beforeEach(async () => {
	await mongoose.connect(process.env.MONGODB_URI);
});

describe('POST /users', () => {
	describe('given a correct name, username, password and role', () => {
		test('should create a new user and return it', async () => {
			const res = await api
				.post(ROUTE)
				.send(testUser)
				.expect(201)
				.expect('Content-Type', /application\/json/);
			expect(res.body).toEqual(
				expect.objectContaining({
					_id: expect.any(String),
					name: expect.any(String),
					username: expect.any(String),
					password: expect.any(String),
					role: expect.any(String),
				})
			);
		});
	});

	describe('when name and/or username are missing', () => {
		test('should respond with a 400 status code', async () => {
			const data = [{ name: 'test' }, { username: 'test@test.com' }, {}];
			for (const obj of data) {
				await api.post(ROUTE).send(obj).expect(400);
			}
		});
	});

	describe('when there is already a user with the given username', () => {
		test('should respond with a 400 status code', async () => {
			await api.post(ROUTE).send(duplicatedUser).expect(400);
		});
	});
});

describe('GET /users', () => {
	test('should return an array of users', async () => {
		const res = await api
			.get(ROUTE)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(res.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					_id: expect.any(String),
					name: expect.any(String),
					username: expect.any(String),
					password: expect.any(String),
					role: expect.any(String),
				}),
			])
		);
	});

	describe('when the database is empty', () => {
		test('should return a 204 status code and an empty body', async () => {
			await UserModel.deleteMany({});

			const res = await api.get(ROUTE).expect(204);

			expect(res.body).toEqual(expect.anything());
			expect(res.body).toEqual({});
		});
	});
});

afterAll(async () => {
	await mongoose.connection.close();
	server.close();
});
