module.exports = {
    routes: [
        {
            method: "GET",
            path: "/add-info",
            handler: "add-info-controller.getAddInfo"
        },
        {
            method: "POST",
            path: "/add-info",
            handler: "add-info-controller.postAddInfo"
        }
    ]
}