<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable =['title','amount','category_id','account_id','recipient_id'];
    protected $guarded = ['id'];

    public function account (){
        return $this->belongsTo(Account::class);
    }

    public function category (){
        return $this->belongsTo(Category::class);
    }
    public function recipientAccount()
    {
        return $this->belongsTo(Account::class, 'recipient_id');
    }
}
