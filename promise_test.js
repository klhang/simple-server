class Promise2 {
    succeed = null;
    fail = null;
    state = 'pending';

    constructor(fn) {
        fn(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(result) {
        setTimeout(() => {
            this.state = 'fulfilled';
            this.succeed(result);
        });
    }

    reject(result) {
        setTimeout(() => {
            this.state = 'rejected';
            this.fail(result);
        });
    }

    then(succeed, fail) {
        this.succeed = succeed;
        this.fail = fail;
    }
}

function fn() {
    return new Promise2((resolve, reject) => {
        //when succeed 
        resolve();

        //when fail
        reject();
    })
}

fn.then(onSuccess, onFail)
  .then(onSuccess2, onFail2)
  .catch(onError)
  .always(onOtherOp)