import { Inter } from 'next/font/google'
import {calculate } from "@/utils/utils";
import React, {useState} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [houseCost, setHouseCost] = useState<number>();
  const [expectedYield, setExpectedYield] = useState<number>();
  const [renovationConst, setRenovationConst] = useState<number>();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <form noValidate className="flex flex-col">
        <label className="flex justify-between">House cost
          <input className="text-slate-900 mb-8 h-8 px-4" type="number" name='houseCostStr' value={houseCost}
          onChange={e=> setHouseCost(Number(e.target.value))}/>
        </label>

        <label className="flex justify-between">Expected monthly yield
          <input className="text-slate-900 mb-8 h-8 px-4" type="number" name='expectedYieldStr' value={expectedYield}
          onChange={e=> setExpectedYield(Number(e.target.value))}/>
        </label>

        <label className="flex justify-between">Renovation Costs
          <input className="text-slate-900 mb-8 h-8 px-4" type="number" name='renovationConstStr' value={renovationConst}
          onChange={e=> setRenovationConst(Number(e.target.value))}/>
        </label>
      </form>

      <table>
        <tbody>{/* @ts-ignore*/}
        {houseCost && expectedYield && renovationConst && Object.entries(calculate({houseCost , expectedYield,renovationConst})).map((key) =>{
            return        (
                <tr key={key[0]} className='border-2 px-4 py-2 flex justify-between'>
                  <td className='w-80'>{key[0]}</td>
                  <td>{key[1]}</td>
                </tr>
            )
            }
        )}
        </tbody>
      </table>
    </main>
  )
}
