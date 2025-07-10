module.exports = {
    routes: [
        {
            method: "GET",
            path: "/status/:id",
            handler: "custom-controller.chekcStatus"
        }
    ]
}