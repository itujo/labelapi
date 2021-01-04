import { Request, Response } from 'express';
import exec from '../firebird';

export default {
  async index(_req: Request, res: Response) {
    try {
      const query = `
                  SELECT 
                    * 
                  FROM 
                    cadastro
                  `;
      const data: any = await exec(query);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
  async show(req: Request, res: Response) {
    try {
      const query = `
                SELECT
                  sequencia,
                  nome,
                  cep,
                  endereco,
                  numero,
                  complemento,
                  bairro,
                  cidade,
                  uf,
                  celular,
                  telefone,
                  retirada,
                  data,
                  proximo
                FROM
                  cadastro
                WHERE
                  cpf_ou_cgc = ?
                ORDER BY
                  data
                DESC
                    `;

      const data = await exec(query, [req.body.cpf_cnpj]);
      return res.status(200).json(data);
    } catch (error) { return res.status(500).json(error); }
  },
};
