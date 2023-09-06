// Hw W12D1. Only create  routes for vegetables. Only create Index,Show, Views with subfolders.
const vegetables = [
    {
        name:'Bok Choy',
        color: 'Green',
        readyToEat: true,
        img:"https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/02/bok-choy-1296x728-header.jpg?w=1155&h=1528"
    },
    {
        name:'Portabella Mushroom',
        color: 'Brown/White',
        readyToEat: false,
        img:"https://media.istockphoto.com/id/96672671/photo/mushroom.jpg?s=612x612&w=0&k=20&c=QjYXJ7A0ImsOjpPM_nsTvZH5R5vX1VdMy9Ucw-n0z1I="
    },
    {
        name:'Asparagus',
        color: 'Green',
        readyToEat: true,
        img:"https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXNwYXJhZ3VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        name:'Corn',
        color: 'purple',
        readyToEat: false,
        img:"https://media.istockphoto.com/id/538349602/photo/purple-corn.jpg?s=612x612&w=0&k=20&c=aS_dscE1WZxGs4fYmgzmCdkfi-ASOD-rmnlCg6OcCJM="
    },
    {
        name:'Eggplant',
        color: 'Purple',
        readyToEat: true,
        img:"https://media.istockphoto.com/id/1301926799/photo/eggplant-or-aubergine-with-slices-isolated-on-white-background-clipping-path-and-full-depth.webp?b=1&s=170667a&w=0&k=20&c=swjg7fHHG_GsozXyJc4ZkKhn3VVaTAtSBHznWKFQe8g="
    }
  ];
  
//   export vegetables.js from models folder to import it into server.js
  module.exports = vegetables