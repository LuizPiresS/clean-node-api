import request from 'supertest'

import app from '../config/app'

describe('SignUp Routes', () => {
  test('Sould return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Kandrus',
        email: 'kandrus@kw13.com.br',
        password: '123456',
        passwordConfirmation: '123456'

      })
      .expect(200)
  })
})
