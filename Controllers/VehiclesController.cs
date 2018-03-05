using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Data;
using vega.Models;
using vega.Models.Resources;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public VehiclesController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpPost()]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }
    }
}