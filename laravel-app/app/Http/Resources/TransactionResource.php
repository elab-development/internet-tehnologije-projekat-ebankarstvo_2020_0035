<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap='transaction';
    public function toArray(Request $request): array
    {
        $this->resource->load('account');
        return[
        'id'=>$this->resource->id,
        'title'=>$this->resource->title,
        'amount'=>$this->resource->amount,
        //'account'=>$this->resource->account,
        'category'=>$this->resource->category
        
        ];
    }
}
