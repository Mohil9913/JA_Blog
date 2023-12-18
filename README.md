Database : Mongodb (Connection type -> Local by mongo shell)
Database Name : ja_blogs
Collection Name : upload

Dummy Data insert Query : db.upload.insertOne({name: 'Degree',specializations: [{name: 'Computer',items: [{ filename: 'pps.pdf', url: '/uploads/pps.pdf', semester: 1, material: 'pps' },{ filename: 'math.pdf', url: '/uploads/math.pdf', semester: 1, material: 'math' },{ filename: 'algo.pdf', url: '/uploads/algo.pdf', semester: 2, material: 'algo' },],},{name: 'Civil',items: [{ filename: 'pps.pdf', url: '/uploads/pps.pdf', semester: 1, material: 'pps' },{ filename: 'math.pdf', url: '/uploads/math.pdf', semester: 2, material: 'math' },{ filename: 'algo.pdf', url: '/uploads/algo.pdf', semester: 2, material: 'algo' },],},],})

Dummy Data in collection :
[
  {
    _id: ObjectId('657f15936271d244189bdc49'),
    name: 'Degree',
    specializations: [
      {
        name: 'Computer',
        items: [
          {
            filename: 'pps.pdf',
            url: '/uploads/pps.pdf',
            semester: 1,
            material: 'pps'
          },
          {
            filename: 'math.pdf',
            url: '/uploads/math.pdf',
            semester: 1,
            material: 'math'
          },
          {
            filename: 'algo.pdf',
            url: '/uploads/algo.pdf',
            semester: 2,
            material: 'algo'
          }
        ]
      },
      {
        name: 'Civil',
        items: [
          {
            filename: 'pps.pdf',
            url: '/uploads/pps.pdf',
            semester: 1,
            material: 'pps'
          },
          {
            filename: 'math.pdf',
            url: '/uploads/math.pdf',
            semester: 2,
            material: 'math'
          },
          {
            filename: 'algo.pdf',
            url: '/uploads/algo.pdf',
            semester: 2,
            material: 'algo'
          }
        ]
      }
    ]
  },
  {
    _id: ObjectId('657f16196271d244189bdc4a'),
    name: 'Diploma',
    specializations: [
      {
        name: 'Electrical',
        items: [
          {
            filename: 'pps.pdf',
            url: '/uploads/pps.pdf',
            semester: 3,
            material: 'pps'
          },
          {
            filename: 'math.pdf',
            url: '/uploads/math.pdf',
            semester: 2,
            material: 'math'
          },
          {
            filename: 'algo.pdf',
            url: '/uploads/algo.pdf',
            semester: 6,
            material: 'algo'
          }
        ]
      },
      {
        name: 'Mechanical',
        items: [
          {
            filename: 'pps.pdf',
            url: '/uploads/pps.pdf',
            semester: 5,
            material: 'pps'
          },
          {
            filename: 'math.pdf',
            url: '/uploads/math.pdf',
            semester: 5,
            material: 'math'
          },
          {
            filename: 'algo.pdf',
            url: '/uploads/algo.pdf',
            semester: 5,
            material: 'algo'
          }
        ]
      }
    ]
  }
]

