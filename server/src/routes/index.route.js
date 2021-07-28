import BillRoute from "./bill.route.js";

const Routes = (app) => {
    app.use('/api/housecharge', BillRoute);
}

export default Routes;