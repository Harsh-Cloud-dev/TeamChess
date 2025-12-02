# setup.py
from setuptools import setup, Extension
import pybind11

ext_modules = [
    Extension(
        'example',                  # module name
        ['example.cpp'],            # source file
        include_dirs=[pybind11.get_include()],
        language='c++'
    ),
]

setup(
    name='example',
    version='0.0.1',
    ext_modules=ext_modules,
)
