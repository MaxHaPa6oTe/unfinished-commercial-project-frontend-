'use client'
import React from "react";
import './sotr.css'
import anonim from '../anonim.png'
import Image from "next/image";
import axios from "axios";
import { Backend_URL } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import { IWorker } from "@/lib/types";

type Props = {
  params: {
    id: string;
  };
};

const Sotrydnik = (props:Props) => {
  const { data: session } = useSession();
  axios.defaults.headers.common = {'Authorization': `Bearer ${session?.backendTokens.accessToken}`}
const [worker, setWorker] = React.useState<null | IWorker>(null)
React.useEffect(()=>{
  axios.get(`${Backend_URL}/worker/${props.params.id}`)
  .then(o=>setWorker(o.data)).catch(()=>console.log(''))
},[session])
  return (
    <>
      <div className="sotrydnik">
      <h2>Информация о сотруднике</h2>

      <div className="body">
      <div className="body_1">
      <label>
        Фото сотрудника
    </label>
    <br/>
    {worker?
    <img alt='' src={`${Backend_URL}/${worker.photo}`} className="face"/>:
    <Image alt='' src={anonim} className="face"/>}
    <br/>
      </div>
      <div className="body_2">
    <label>
        ФИО Сотрудника
    </label>
    <br/>
    <p>
    <i><b>{worker?.fio}</b></i>
    </p>
    <label>
        Дата рождения
    </label>
    <p>
    <i><b>{worker?.birthday}</b></i>
    </p>
    <label>
        Должность
    </label>
    <p>
    <i><b>{worker?.post}</b></i>
    </p>
    <label>
        Дата добавления
    </label>
    <p>
    <i><b>{worker?.createdAt.slice(0,19).replace('T',' ')}</b></i>
    </p>
      </div>
      </div>

      <div className="footer">

      </div>
      </div>
    </>
  );
};

export default Sotrydnik;
