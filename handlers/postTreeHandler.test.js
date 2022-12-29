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

describe('POST /api/tree', () => {
  test('Happy Path - Add node to tree', () => supertest(app).post('/api/tree').send({
    parent: 1,
    label: 'testing 3',
  }).expect(200)
  // eslint-disable-next-line no-unused-vars
    .then((res) => {
      expect(cache.get('tree').length).toEqual(1);
    }));
  test('Happy Path - Add node to child node tree', async () => {
    cache.mset([{ key: 'tree', val: sampleTree }, { key: 'currentId', val: 2 }]);

    await supertest(app).post('/api/tree').send({
      parent: 2,
      label: 'testing 3',
    }).expect(200)
      .then(() => {
        expect(cache.get('tree')).toEqual([
          {
            1: {
              label: 'testing 3',
              children: [
                {
                  2: {
                    label: 'testing 3',
                    children: [
                      {
                        3: {
                          label: 'testing 3',
                          children: [],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ]);
      });
  });
  test('Unhappy Path - Invalid parent (root)', async () => {
    cache.mset([{ key: 'tree', val: sampleTree }, { key: 'currentId', val: 2 }]);

    await supertest(app).post('/api/tree').send({
      parent: 3,
      label: 'testing 3',
    }).expect(400)
      .then((res) => {
        expect(res.body.message).toEqual('parent 3 not found');
      });
  });
});
