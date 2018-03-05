using System;

namespace vega.Models.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }

        public DateTime LastUpdate { get; set; }

        public int ModelId { get; set; }

        public string ContactName { get; set; }

        public string ContactPhone { get; set; }

        public string ContactEmail { get; set; }

    }
}