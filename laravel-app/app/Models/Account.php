<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Account extends Model
{
    use HasFactory;

    protected $fillable =['title', 'number', 'type', 'balance','user_id','role'];
    protected $guarded = ['id','number','type','balance'];

    public function user (){
        return $this->belongsTo(User::class);
    }

    public function transactions (){
        return $this->hasMany(Transaction::class);
    }
    public function receivedTransactions()
    {
        return $this->hasMany(Transaction::class, 'recipient_id');
    }
}


