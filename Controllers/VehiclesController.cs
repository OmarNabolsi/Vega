using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Data;
using vega.Models;
using vega.Models.Resources;
using System.Linq;

namespace vega.Controllers
{
    public class VehiclesController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public VehiclesController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpPost("/api/vehicle")]
        public IActionResult Create([FromBody] VehicleResource vehicleResource)
        {
            /*
            var vehicle = new Vehicle {
                LastUpdate = vehicleResource.LastUpdate,
                ModelId = vehicleResource.ModelId,
                ContactName = vehicleResource.ContactName,
                ContactPhone = vehicleResource.ContactPhone,
                ContactEmail = vehicleResource.ContactEmail
            };
            */

            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            
            var vehicle = this.mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            this.context.Vehicles.Add(vehicle);
            this.context.SaveChangesAsync();
            return Ok(vehicle);
        }
    }
}