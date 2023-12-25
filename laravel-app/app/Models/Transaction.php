<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable =['title','amount','category_id','account_id'];
    protected $guarded = ['id','amount'];

    public function accounts (){
        return $this->belongsTo(Account::class);
    }

    public function category (){
        return $this->belongsTo(Category::class);
    }
}
