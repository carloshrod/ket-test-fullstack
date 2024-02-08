const request = require('supertest');
const mongoose = require('mongoose');
const { server, app } = require('../src/index');
const UserModel = require('../src/models/user.model');
const MessageModel = require('../src/models/message.model');

const api = request(app);
const ROUTE = '/api/v1';

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
const testSignin = { username: 'test1', password: 'P455' };

beforeAll(async () => {
	await mongoose.connect(process.env.MONGODB_URI);
	await UserModel.deleteMany({});
});

describe('POST /', () => {
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
			const data = [{ name: 'test' }, { username: 'test1' }, {}];
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

describe('POST /signin', () => {
	describe('given a correct username and password', () => {
		test('should return user and token', async () => {
			const res = await api
				.post(`${ROUTE}/signin`)
				.send(testSignin)
				.expect(200)
				.expect('Content-Type', /application\/json/);
			expect(res.body).toEqual(
				expect.objectContaining({
					user: {
						_id: expect.any(String),
						name: expect.any(String),
						username: expect.any(String),
						password: expect.any(String),
						role: expect.any(String),
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
					},
					token: expect.any(String),
				})
			);
		});
	});

	describe('when username and/or password are missing', () => {
		test('should respond with a 400 status code', async () => {
			const data = [{ username: 'test1' }, { password: 'P455' }, {}];
			for (const obj of data) {
				await api.post(ROUTE).send(obj).expect(400);
			}
		});
	});

	describe('given an incorrect password', () => {
		test('should respond with a 400 status code', async () => {
			await api
				.post(`${ROUTE}/signin`)
				.send({
					username: testSignin.username,
					password: 'incorrectPassword',
				})
				.expect(400);
		});
	});
});

describe('GET /messages', () => {
	test('should return an array of messages', async () => {
		const newMessage = new MessageModel({
			body: 'Test body message',
			from: 'Test username',
			role: 'Test role',
		});
		await newMessage.save();

		const res = await api
			.get(`${ROUTE}/messages`)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(res.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					_id: expect.any(String),
					body: expect.any(String),
					from: expect.any(String),
					role: expect.any(String),
				}),
			])
		);
	});

	describe('when the database is empty', () => {
		test('should return a 204 status code and an empty body', async () => {
			await MessageModel.deleteMany({});
			await api.get(`${ROUTE}/messages`).expect(204);
		});
	});
});

afterAll(async () => {
	await mongoose.connection.close();
	server.close();
});
