<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'title' => $this->title,
            'type' => $this->type,
            'balance' => $this->balance,
            //'user'=>$this->resource->user
            //'id' => $this->id,
            'name' => $this->name,
            #'transactions' => TransactionResource::collection($this->transactions), 
        ];
    }
}
