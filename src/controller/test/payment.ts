import { Request, Response } from "express";
import MercadoPagoConfig, { Payment } from "mercadopago";
const client = new MercadoPagoConfig({ accessToken: 'TEST-2079121281178809-072214-f8e6cbd32d85cfcd82202032cff5ad77-450575950' });
const payment = new Payment(client);
export const testPayment = async (req: Request, res: Response) => {
  const { data} = req.body;

const result= await  payment.create({body:data})
res.send(result)
  
  
};