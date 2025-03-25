<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
        CREATE TRIGGER after_insert_transaction
        AFTER INSERT ON transactions
        FOR EACH ROW
        BEGIN
            -- Update the sender\'s account balance
            UPDATE accounts
            SET balance = balance - NEW.amount
            WHERE id = NEW.account_id;

            -- Update the recipient\'s account balance
            UPDATE accounts
            SET balance = balance + NEW.amount
            WHERE id = NEW.recipient_id;
        END
    ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS after_insert_transaction');
    }
};