import BillRoute from "./bill.route.js";

const Routes = (app) => {
    app.use('/bill', BillRoute);
}

export default Routes;