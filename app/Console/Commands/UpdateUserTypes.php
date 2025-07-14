<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateUserTypes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:update-types';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update old user types to new allowed values (colegio, universidad, empresa)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Updating user types...');

        // Get count of users that need to be updated
        $count = DB::table('usuarios_biblioteca')
            ->whereNotIn('tipo_usuario', ['colegio', 'universidad', 'empresa'])
            ->count();

        if ($count === 0) {
            $this->info('No users need to be updated. All users already have valid types.');
            return 0;
        }

        $this->info("Found {$count} users to update.");

        // Update using raw SQL to avoid enum constraint issues
        $updated = DB::table('usuarios_biblioteca')
            ->whereNotIn('tipo_usuario', ['colegio', 'universidad', 'empresa'])
            ->update([
                'tipo_usuario' => DB::raw("'colegio'"),
                'updated_at' => now()
            ]);

        $this->info("Successfully updated {$updated} users to type 'colegio'.");

        // Show current distribution
        $this->info('Current user type distribution:');
        $distribution = DB::table('usuarios_biblioteca')
            ->select('tipo_usuario', DB::raw('count(*) as count'))
            ->groupBy('tipo_usuario')
            ->get();

        foreach ($distribution as $type) {
            $this->line("- {$type->tipo_usuario}: {$type->count} users");
        }

        return 0;
    }
}
