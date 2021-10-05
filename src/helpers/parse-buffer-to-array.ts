import { Readable } from 'stream';
import * as parse from 'csv-parse';

export function parseBufferToArray<T>(buffer: Buffer, handler?: any, delimiter = ','): Promise<T[]> {
  const csvData = [] as T[];
  const options = { delimiter };

  const readableInstanceStream = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    }
  });

  return new Promise<T[]>((resolve) => {
    readableInstanceStream
      .pipe(parse(options))
      .on('data', function(row) {
        const parsedRow = handler ? handler(row) : row;

        csvData.push(parsedRow);
      })
      .on('end',function() {
        resolve(csvData);
      });
  });
}
