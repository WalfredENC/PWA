using Microsoft.AspNetCore.Mvc;
using PWA_WENC.Clases;
using PWA_WENC.Models;

namespace PWA_WENC.Controllers
{
    public class LibroController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public List<LibroCLS> listaLibros()
        {
            List<LibroCLS> libros = new List<LibroCLS>();
            using(db_a8ef88_bibliotecamsContext bd = new db_a8ef88_bibliotecamsContext())
            {
                libros =  (from libro in bd.Libros
                            where libro.Bhabilitado == 1
                            select new LibroCLS
                            {
                                titulo = libro.Titulo,
                                paginas = libro.Numpaginas,
                                stock = libro.Stock,
                                iidautor = libro.Iidautor
                            }).ToList();
                return libros;
            }
        }
    }
}
