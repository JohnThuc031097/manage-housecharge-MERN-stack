import BillRoute from "./bill.route.js";

const Routes = (app) => {
    app.use('/housecharge', BillRoute);
}

export default Routes;