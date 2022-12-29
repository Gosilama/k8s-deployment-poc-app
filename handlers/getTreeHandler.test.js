const supertest = require('supertest');
const app = require('../expressApp');
const cache = require('../cache');

const sampleTree = [
  {
    1: {
      label: 'testing 3',
      children: [
        {
          2: {
            label: 'testing 3',
            children: [
              {
                4: {
                  label: 'testing 3',
                  children: [],
                },
              },
              {
                5: {
                  label: 'testing 3',
                  children: [],
                },
              },
            ],
          },
        },
        {
          3: {
            label: 'testing 3',
            children: [],
          },
        },
      ],
    },
  },
];

beforeEach(() => {
  cache.flushAll();
});

describe('GET /api/tree', () => {
  test('Happy path - Get empty tree', async () => {
    await supertest(app).get('/api/tree').expect(200).then((res) => {
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
  test('Happy path - tree with data', async () => {
    cache.set('tree', sampleTree);

    await supertest(app).get('/api/tree').expect(200).then((res) => {
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body).toEqual(sampleTree);
    });
  });
});
