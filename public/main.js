// const apiUrl = "/http://localhost:1200/api/v1";
// let currentToken = "";

// const patchReq = document.querySelector("#patch");
// patchReq.addEventListener("click", async (ev) => {
//     console.log(ev);
//     const reqBody = {
//         "name": "Fish Game",
//         "info": "Fish",
//         "category": "games",
//         "img": "Fish.jpg",
//         "price": 25
//     }
//     const res = await axios(
//         {
//             method: 'PATCH',
//             url: apiUrl + ev.target.innerHTML,
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-api-key": currentToken
//             },
//             body: reqBody
//         }
//     );
// });



// const deleteReq = document.querySelector("#delete");
// deleteReq.addEventListener("click", async (ev) => {
//     console.log(ev);
//     const res = await axios(
//         {
//             method: 'DELETE',
//             url: apiUrl + ev.target.innerHTML,
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-api-key": currentToken
//             },
//         }
//     );
// });



// const postReq = document.querySelectorAll(".post");
// postReq.forEach((element) => {
//     element.addEventListener("click", async (ev) => {
//         const url = ev.target.innerHTML;
//         console.log(apiUrl + url);
//         let reqBody;
//         if (url == "/toys") {
//             reqBody = {
//                 "name": "fish doll",
//                 "info": "fish doll to children.",
//                 "category": "Stuffed Animals",
//                 "img_url": "Fish.jpg",
//                 "price": 14.99
//             }

//         }
//         else if (url == "/users") {
//             reqBody = {
//                 "name": "Yossi Levi",
//                 "email": "yl@gmail.com",
//                 "password": "yl123456"
//             }
//         }
//         else if (url == "/users/login") {
//             reqBody = {
//                 "email": "yl@gmail.com",
//                 "password": "yl123456"
//             }
//         }
//         console.log(reqBody);

//         const req = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-api-key": currentToken
//             },
//             data: reqBody // Use 'data' instead of 'body'
//         };
//         fetch(apiUrl + url, req)
//             .then(res => res.json())
//             .then((data) => {
//                 console.log(data);
//                 if (url === "/users/login") {
//                     const token = res.data.token;
//                     // Do something with the token, e.g., store it for future requests
//                     currentToken = token;
//                     console.log("Token:", token);
//                 }
//             })
//             .catch(err => console.log(err));

//     });
// });



// const getReq = document.querySelectorAll(".get");
// getReq.forEach((element) => {
//     element.addEventListener("click", async (ev) => {
//         console.log(ev);

//         const res = await axios(
//             {
//                 method: 'GET',
//                 url: apiUrl + ev.target.innerHTML,
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//     });
// });

