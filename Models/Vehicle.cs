using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Models
{
    [Table("Vehicles")]
    public class Vehicle
    {
        public int Id { get; set; }

        public DateTime LastUpdate { get; set; }
        public Model Model { get; set; }

        [Required]
        public int ModelId { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactPhone { get; set; }

        public string ContactEmail { get; set; }

    }
}