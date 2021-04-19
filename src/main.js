require("babel-runtime/regenerator")
require("./main.css")
require("./index.html")

var a = async () => {
    const { a, b } = arguments
    await console.log("Hello from the future!", a , b);
    console.log("Done!")
}

a( {a:1, b:2} )