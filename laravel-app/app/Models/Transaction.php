<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable =['title'];
    protected $guarded = ['id','amount'];

    public function accounts (){
        return $this->belongsTo(Account::class);
    }
}
