<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id'=>$this->resource->id,
            'name'=>$this->resource->name,
            'email'=>$this->resource->email,
            'password'=>$this->resource->password,
            'role'=>$this->resource->role,
            'accounts' => AccountResource::collection($this->resource['accounts']),
            
            ];
    }
}
