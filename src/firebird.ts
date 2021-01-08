import Firebird from 'node-firebird';
import database from '@config/database.config';
import convertBufferArray from './utils/convertBufferArray';

const options: Firebird.Options = database;

const fbPool = Firebird.pool(5, options);

const exec: Firebird.QueryCallback = (query: string, params = []) =>
  new Promise((resolve, reject) => {
    fbPool.get((err: Error, db: Firebird.Database) => {
      fbPool.destroy();
      if (err) {
        reject(err);
      }
      try {
        db.query(query, params, (error: Error, data: JSON[]) => {
          if (error) {
            reject(error);
            db.detach();
          } else {
            const result = [];
            data.forEach((row) => {
              const tempObj = {};
              Object.keys(row).forEach((el) => {
                tempObj[el] = convertBufferArray(row[el]);
              });
              result.push(tempObj);
            });

            resolve(result);
            db.detach();
          }
          db.detach();
        });
      } catch (error) {
        reject(error);
      }
    });
  });

export default exec;
