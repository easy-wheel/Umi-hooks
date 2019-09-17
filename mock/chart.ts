import mockjs from 'mockjs';

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

export default {
  'GET /api/tags': mockjs.mock({
    'list|100': [
      {
        name: '@city',
        'value|1-100': 150,
        'type|0-2': 1,
      },
    ],
  }),
  'GET  /api/fake_chart_data': salesData,
};
