import { CronJob } from "cron";
import { transactionService } from "../services/transaction.service";
import { isConnected } from "../config/database";

class TransactionGenerator {
    private job: CronJob;
    private isRunning: boolean = false;
    private retryCount: number = 0;
    private maxRetries: number = 3;
    private retryDelay: number = 1000;

    constructor() {
        this.job = new CronJob('* * * * * *', this.generateTransactionWithRetry.bind(this));
    }

    private async generateTransactionWithRetry() {
        if (!isConnected()) {
            console.warn("DB not connected. Skipping transaction generation.");
            return;
        }

        try {
            await this.generateTransaction();
            // reset retry count on success
            this.retryCount = 0;
        } catch (error) {
            console.error('Failed to genereate transaction:', error);

            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                console.log('Retrying transaction generation...');

                setTimeout(() => {
                    this.generateTransactionWithRetry();

                }, this.retryDelay * this.retryCount

                )
            }
            else {
                console.error("Max retries reached. Stopping CRON Job.")
                this.stop();
            }
        }
    }

    private async generateTransaction() {
        const countries = ['IND', 'US', 'UK', 'AUS', 'NZ'];
        const tags = ['retail', 'food', 'travel', 'movie', 'game'];
        const descriptions = [
            'Online Purchase',
            'Restaurant Payment',
            'Travel Booking',
            'Movie Ticket',
            'Game Service'
        ];

        const randomTransaction = {
            userId : `user_${Math.floor(Math.random() * 1000)}`,
            amount : parseFloat((Math.random() * 1000).toFixed(2)),
            description: `${descriptions[Math.floor(Math.random() * descriptions.length)]}`,
            country: countries[Math.floor(Math.random() * countries.length)],
            tags: [tags[Math.floor(Math.random() * tags.length)]],
            status : 'completed' as const
        };

        await transactionService.createTransaction(randomTransaction);
    }

    start() {
        if(!isConnected()){
            console.error("Cannot start CRON Job: DB not connected");
            return false;
        }

        if(!this.isRunning){
            this.job.start();
            this.isRunning = true;
            console.log("Transaction generator started");
            return true;
        }

        return false;
    }

    stop() {
        if(this.isRunning){
            this.job.stop();
            this.isRunning =false;
            this.retryCount = 0;
            console.log("Transaction generetor stopped");
            return true;
        }

        return false;
    }

    getStatus() {
        return {
            isRunning : this.isRunning,
            dbConnected: isConnected(),
            retryCount : this.retryCount
        }
    }
}

export const transactionGenerator = new TransactionGenerator();