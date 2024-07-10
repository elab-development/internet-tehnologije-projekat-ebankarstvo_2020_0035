namespace App\Actions\Fortify;

use Illuminate\Auth\Passwords\PasswordBroker as BasePasswordBroker;

class CustomPasswordBroker extends BasePasswordBroker
{
    
    public function resetUrl($user, $token)
    {
        return 'http://localhost:3000/reset-password/' . $token; // Change port and URL path as needed
    }
}