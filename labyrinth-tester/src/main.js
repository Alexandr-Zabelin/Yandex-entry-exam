// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
export default function main(game, start) {
  function getPoint(game, x, y) {
    const isFinish = new Promise((resolve, reject) => {
      game.state(x, y).then((state) => {
        if (state.finish) {
           resolve({ x, y });
        } else {
          reject(new Error('Not finish'));
        }
    }, (error) => reject(error))});

    const up = new Promise((resolve, reject) => {
      game.state(x, y - 1).then((value) => {
        reject(new Error(''));
      }, (error) => {
        game.up(x, y).then((value) => {
          getPoint(game, x, y - 1).then((value) => resolve(value), (error) => reject(error));
        }, (error) => {
          reject(new Error(''));
        });
    })});

    const right = new Promise((resolve, reject) => {
      game.state(x + 1, y).then((value) => {
        reject(new Error(''));
      }, (error) => {
        game.right(x, y).then((value) => {
          getPoint(game, x + 1, y).then((value) => resolve(value), (error) => reject(error));
        }, (error) => {
          reject(new Error(''));
        });
    })});

    const down = new Promise((resolve, reject) => {
      game.state(x, y + 1).then((value) => {
        reject(new Error(''));
      }, (error) => {
        game.down(x, y).then((value) => {
          getPoint(game, x, y + 1).then((value) => resolve(value), (error) => reject(error));
        }, (error) => {
          reject(new Error(''));
        });
    })});

    const left = new Promise((resolve, reject) => {
      game.state(x - 1, y).then((value) => {
        reject(new Error(''));
      }, (error) => {
        game.left(x, y).then((value) => {
          getPoint(game, x - 1, y).then((value) => resolve(value), (error) => reject(error));
        }, (error) => {
          reject(new Error(''));
        });
    })});

    return Promise.any([isFinish, up, down, right, left]).then((value) => value);
  }
  
  return getPoint(game, start.x, start.y);
}
