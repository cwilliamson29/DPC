import {index, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    index("./routes/home.tsx"),
    route("dashboard", "./components/Dashboard.tsx"),
    route("income", "./components/Income.tsx"),
    route("accounts", "./components/Accounts.tsx"),
    route("debt", "./components/Debt.tsx"),
    route("debt_payoff_calculator", "./components/DebtPayoff.tsx"),
] satisfies RouteConfig;
