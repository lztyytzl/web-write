class TaskPro {
    tasks = [];
    _isRunning = false;
    _currentIndex = 0;
    addTask(task) {
        if (typeof task !== 'function') {
            throw new Error('Task must be a function');
        }
        this.tasks.push(task);
    }
    run = async () => {
        if (this._isRunning) {
            return;
        }
        this._isRunning = true;
        await this._runTask();
    }

    _runTask = async () => {
        if (this._currentIndex >= this.tasks.length) {
            this._isRunning = false;
            this._currentIndex = 0;
            this.tasks = [];
            return;
        }
        const task = this.tasks[this._currentIndex];
        // const i = this._currentIndex;
        await task(this._next.bind(this));
        // const j = this._currentIndex;
        // if(i === j) {
        //    await this._next();
        // }
        await this._next();
    }

    _next = async () => {
        this._currentIndex++;
        await this._runTask();
    }
}

const t = new TaskPro();
t.addTask(async (next) => {
    console.log('start')
    await next()
    console.log('end')
});
t.addTask(() => {
    console.log(2)
})
t.addTask(async (next) => {
    console.log(4)
    await next()
    console.log(5)
})
t.addTask(() => {
    console.log(3)
})
t.run();