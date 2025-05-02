<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Member',
            'email' => 'member@jakkrit.site',
            'password' => bcrypt('Aa112233'),
            'role' => 'user',
        ]);
    }
}
