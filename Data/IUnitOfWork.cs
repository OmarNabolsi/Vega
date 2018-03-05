using System.Threading.Tasks;

namespace vega.Data
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}