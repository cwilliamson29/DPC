import React from 'react'
import useGetData from "~/hooks/useGetData";
import Card from "~/components/tailwindcss/Card";

function Accounts() {
    const tester = false
    const {data, loading, error} = useGetData("income", tester);

    const dummyAccounts = [
        {
            id: 1,
            name: "Capitol One",
            type: "Checking",
            primary: true,
        },
        {
            id: 2,
            name: "Chase Bank",
            type: "Savings",
            primary: true,
        }
    ]
    const dummyDeposits = [
        {
            id: 1,
            accountId: 1,
            incomeId: 9,
            type: "dollar",
            amount: 500,
        },
        {
            id: 2,
            accountId: 1,
            incomeId: 9,
            type: "dollar",
            amount: 500,
        }
    ]


    return (
        <div>
            {dummyAccounts.map((account) => {
                return (
                    <Card title={account.name}>
                        <div><span className="text-lg font-bold">{account.primary ? "Primary" : "Secondary"}</span> - <span>{account.type}</span></div>
                        <div></div>
                    </Card>
                )
            })}
        </div>
    )
}

export default Accounts
