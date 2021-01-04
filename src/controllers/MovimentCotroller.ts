import { Request, Response } from 'express';
import exec from '../firebird';

export default {
  async index(req: Request, res: Response) {
    try {
      const query = `
                  SELECT 
                    idcliente,
                    nome_cliente,
                    descricao,
                    produto,
                    idproduto,
                    lote,
                    codigo,
                    enco,
                    digito,
                    tm,
                    berco
                  FROM 
                    movimento
                  WHERE
                    lote = ?
                  `;
      const data: any = await exec(query, [req.params.lote]);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async show(req: Request, res: Response) {
    try {
      const query = `
                  SELECT 
                    codigo
                  FROM 
                    movimento
                  WHERE
                    lote = ?
                  `;
      const data: any = await exec(query, [req.params.lote]);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

};
