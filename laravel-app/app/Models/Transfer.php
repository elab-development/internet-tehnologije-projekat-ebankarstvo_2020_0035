<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'transfers';

    // Define the fields that can be mass-assigned
    protected $fillable = [
        'from_account_id',
        'to_account_id',
        'amount',
        'converted_amount',
        'from_currency',
        'to_currency',
        'status',
    ];

    // Define the relationships
    public function fromAccount()
    {
        return $this->belongsTo(Account::class, 'from_account_id');
    }

    public function toAccount()
    {
        return $this->belongsTo(Account::class, 'to_account_id');
    }
}


