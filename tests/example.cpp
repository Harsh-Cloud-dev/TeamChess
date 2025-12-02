#include <pybind11/pybind11.h>
namespace py = pybind11;
class Greeter {
public:
    Greeter(const std::string &name) : name(name) {}

    std::string say_hello() const {
        return "Hello, " + name + "!";
    }

private:
    std::string name;
};

PYBIND11_MODULE(example, m) {
    py::class_<Greeter>(m, "Greeter")
        .def(py::init<const std::string &>()) 
        .def("say_hello", &Greeter::say_hello);
}
