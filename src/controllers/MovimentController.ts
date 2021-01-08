import { Request, Response } from 'express';
import exec from '../firebird';

export default {
  async index(req: Request, res: Response): Promise<Express.Response> {
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
      const data = await exec(query, [req.params.lote]);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async show(req: Request, res: Response): Promise<Express.Response> {
    try {
      const queryLote = `
                    SELECT
                      nome_cliente as fornecedor,
                      p_o as descricao,
                      sap as TM,
                      ean,
                      fornecedor as cliente,
                      lote,
                      pedido as PO,
                      caixa as qtdCaixa,
                      pacote as totalLote,
                      fecha as data
                    FROM
                      lote
                    WHERE
                      lote = ?
                    `;
      const dataLote: any = await exec(queryLote, [req.params.lote]);

      const queryMovimento = `
                    SELECT
                      *
                    FROM
                      movimento
                    WHERE
                      lote = ?
                    ORDER BY
                      sequencia
                    `;

      const dataMovimento: any = exec(queryMovimento, [req.params.lote]);

      const dataRetorno = [...dataLote, ...dataMovimento];

      return res.status(200).json(dataRetorno);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
