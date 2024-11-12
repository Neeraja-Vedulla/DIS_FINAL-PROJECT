using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TouristWebsite.Models;

namespace MyTourismWebsite.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Services()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View("Login");  // Renders the login form
        }

        public IActionResult Signup()
        {
            return View("Signup");  // Renders the signup form
        }
    }
}
